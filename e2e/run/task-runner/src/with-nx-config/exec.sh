DIR=$(dirname "$0")
UPDATE_SNAPSHOTS=$1


# Inline the bash util functions
source "$DIR/../utils.sh"

# Initialize the Fixture and modify the generated fixture root path
declare FIXTURE_ROOT_PATH
initializeFixture $DIR

# Run the relevant task runner commands and write stdout and stderr to a named file in each case (for later assertions)
npx lerna run print-name > $OUTPUTS/all-child-packages.txt 2>&1
npx lerna run print-name-run-one-only > $OUTPUTS/single-package.txt 2>&1
npx lerna run print:name:run-one-only > $OUTPUTS/single-package-colon.txt 2>&1
npx lerna run print:name > $OUTPUTS/all-packages-colon.txt 2>&1

# Run the assertions
runAssertions $DIR $FIXTURE_ROOT_PATH $UPDATE_SNAPSHOTS
