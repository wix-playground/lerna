DIR=$(dirname "$0")
UPDATE_SNAPSHOTS=$1

# Inline the bash util functions
source "$DIR/../utils.sh"

# Initialize the Fixture and modify the generated fixture root path
declare FIXTURE_ROOT_PATH
initializeFixture $DIR

# Run the relevant task runner commands and write stdout and stderr to a named file in each case (for later assertions)
npx lerna run log-env-var -- --silent > $OUTPUTS/log-env-var.txt 2>&1
npx lerna run log-env-var --load-env-files=false -- --silent > $OUTPUTS/log-env-var-load-env-files-false.txt 2>&1

# Run the assertions
runAssertions $DIR $FIXTURE_ROOT_PATH $UPDATE_SNAPSHOTS
