#!/bin/bash
set -e

# Constants
BUILD_PATH=.elasticbeanstalk/bundle.zip
declare -a DEPLOYMENT_FILES=(
  ".ebextensions/"
  "dist/"
  "env/"
  "*.json"
  "*.yml"
  "*.yaml"
  ".npmrc"
  "prisma/schema.prisma"
)
declare -a IGNORED_FILES=(
)

# Check if Elastic Beanstalk is initialized
if [ ! -d ".elasticbeanstalk" ] || [ ! -f ".elasticbeanstalk/config.yml" ]; then
  echo "Call 'eb init' first!"
  exit
fi

# Fetch Elastic Beanstalk environments
ENV_LIST=$(eb list)
ENV_LIST=("$(sed 's/* //g' <<< $ENV_LIST)")
ENV_LIST=($(echo "${ENV_LIST[@]}" | tr "\n" "\n"))

echo "Available environments: "
for i in "${!ENV_LIST[@]}"; do
  echo -e "$((i+1))) ${ENV_LIST[$i]}"
done

# Select Elastic Beanstalk environment
echo -e "\nPlease select the environment index:"
printf "> "
read -r ENVIRONMENT_INDEX

if (( "$ENVIRONMENT_INDEX" < 1  || "$ENVIRONMENT_INDEX" > ${#ENV_LIST[@]} )) ; then
    echo "Invalid environment!"
    exit
fi

ENVIRONMENT_NAME=${ENV_LIST[$((ENVIRONMENT_INDEX-1))]}

# Ask for confirmation
echo -e "\n$ENVIRONMENT_NAME is selected. Do you want to continue? (y/N)"
printf "> "
read -r CONFIRMATION

if [[ $CONFIRMATION != "y" && $CONFIRMATION != "Y" ]] ; then
    exit
fi

if ! grep -q "  artifact:" .elasticbeanstalk/config.yml; then
  printf "\ndeploy:\n  artifact: %s" "$BUILD_PATH" >> .elasticbeanstalk/config.yml
fi

# Clean the project
echo -e "\nCleaning the project..."
yarn clean

# Build the project
echo -e "\nBuilding the project..."
nest build

# Create the artifact file
echo -e "\nCreating the artifact file..."
if [ -z "${IGNORED_FILES[*]}" ]; then
  # shellcheck disable=SC2068
  7z a -tzip "$BUILD_PATH" ${DEPLOYMENT_FILES[@]};
else
  # shellcheck disable=SC2068
  7z a -tzip "$BUILD_PATH" ${DEPLOYMENT_FILES[@]} --exclude ${IGNORED_FILES[@]};
fi

# Start Elastic Beanstalk deployment
echo -e "\n\nStarting Elastic Beanstalk deployment..."
eb deploy "${ENVIRONMENT_NAME}"

# Delete artifact file
rm $BUILD_PATH
