import { Fixture, normalizeCommandOutput, normalizeEnvironment } from "@lerna/e2e-utils";

expect.addSnapshotSerializer({
  serialize(str: string) {
    return normalizeCommandOutput(normalizeEnvironment(str));
  },
  test(val: string) {
    return val != null && typeof val === "string";
  },
});

describe("lerna-run-nx-incompatible-options-without-nx-json", () => {
  const fixtureRootPath = process.env.FIXTURE_ROOT_PATH;
  let fixture: Fixture;

  beforeAll(() => {
    if (!fixtureRootPath) {
      throw new Error("FIXTURE_ROOT_PATH environment variable is not set");
    }
    fixture = Fixture.fromExisting(fixtureRootPath);
  });

  afterAll(() => fixture.destroy());

  it("should run script on all child packages using nx", async () => {
    const output = await fixture.readOutput(`print-name`);

    expect(output).toMatchInlineSnapshot(`
      lerna notice cli v999.9.9-e2e.0

      >  Lerna (powered by Nx)   Running target print-name for 3 project(s):

      - package-X
      - package-X
      - package-X



      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X



      >  Lerna (powered by Nx)   Successfully ran target print-name for 3 projects



    `);
  });

  it("--parallel should not warn", async () => {
    const output = await fixture.readOutput(`print-name-parallel`);

    expect(output).toMatchInlineSnapshot(`
      lerna notice cli v999.9.9-e2e.0

      >  Lerna (powered by Nx)   Running target print-name for 3 project(s):

      - package-X
      - package-X
      - package-X



      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X



      >  Lerna (powered by Nx)   Successfully ran target print-name for 3 projects



    `);
  });

  it("--sort should not warn", async () => {
    const output = await fixture.readOutput(`print-name-sort`);

    expect(output).toMatchInlineSnapshot(`
      lerna notice cli v999.9.9-e2e.0

      >  Lerna (powered by Nx)   Running target print-name for 3 project(s):

      - package-X
      - package-X
      - package-X



      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X



      >  Lerna (powered by Nx)   Successfully ran target print-name for 3 projects



    `);
  });

  it("--no-sort should not warn", async () => {
    const output = await fixture.readOutput(`print-name-no-sort`);

    expect(output).toMatchInlineSnapshot(`
      lerna notice cli v999.9.9-e2e.0

      >  Lerna (powered by Nx)   Running target print-name for 3 project(s):

      - package-X
      - package-X
      - package-X



      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X



      >  Lerna (powered by Nx)   Successfully ran target print-name for 3 projects



    `);
  });

  it("--include-dependencies should not warn", async () => {
    const output = await fixture.readOutput(`print-name-include-dependencies`);

    expect(output).toMatchInlineSnapshot(`
      lerna notice cli v999.9.9-e2e.0
      lerna notice filter including dependencies

      >  Lerna (powered by Nx)   Running target print-name for 3 project(s):

      - package-X
      - package-X
      - package-X



      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X

      > package-X:print-name


      > package-X@0.0.0 print-name
      > echo test-package-X

      test-package-X



      >  Lerna (powered by Nx)   Successfully ran target print-name for 3 projects



    `);
  });
});
