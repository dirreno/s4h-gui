# Build and Release Workflow

This GitHub Actions workflow automatically builds your application for Windows, macOS, and Linux on every push and creates releases for tagged versions.

## Workflow Triggers

- **Push to main/master/develop**: Builds the application on all platforms
- **Pull Requests**: Validates builds for all platforms
- **Tags (v*)**: Creates a GitHub Release with all platform artifacts

## Build Process

### 1. Runs on Multiple Platforms
- `ubuntu-latest` - Builds Linux packages (AppImage + DEB)
- `windows-latest` - Builds Windows installers (NSIS + Portable)
- `macos-latest` - Builds macOS packages (DMG + ZIP)

### 2. For Each Platform:
- Checks out the code
- Sets up Node.js 18.x with npm cache
- Installs dependencies via `npm ci`
- Builds the application
- Packages for the specific platform
- Uploads artifacts (retained for 30 days)

### 3. Release Creation
- Automatically triggered when you push a git tag starting with `v` (e.g., `v1.0.0`)
- Downloads all platform artifacts
- Creates a GitHub Release with all packages attached
- Handles pre-releases for alpha/beta versions

## Usage

### Local Testing
```bash
# Build for Windows
npm run package:win

# Build for macOS
npm run package:mac

# Build for Linux
npm run package:linux

# Build for all platforms (requires multi-OS environment)
npm run package:all
```

### Creating a Release
```bash
# Tag a commit
git tag v1.0.0
git push origin v1.0.0
```

The workflow will automatically:
1. Build on all three platforms
2. Create a GitHub Release
3. Attach all platform installers/packages
4. Mark as pre-release if it's an alpha/beta version

## Artifacts

After a successful build, artifacts are available under the workflow's "Artifacts" section for 30 days:
- **windows-build**: `.exe` and `.nsis` files
- **macos-build**: `.dmg` and `.zip` files
- **linux-build**: `.AppImage` and `.deb` files

## Configuration

The workflow is defined in `.github/workflows/build.yml`. Key configurations:

- **Node version**: 18.x
- **Retention period**: 30 days
- **Cache**: npm dependencies are cached for faster builds
- **Failure handling**: Continues building other platforms if one fails

## Troubleshooting

### Build fails on a specific platform
- Check the workflow logs on GitHub Actions
- Verify the error is not environment-specific
- Test locally on that platform first

### Release not created
- Ensure the tag follows the format `v*` (e.g., `v1.0.0`)
- Check that all platform builds completed successfully
- Verify GITHUB_TOKEN has release creation permissions

### Artifacts not uploading
- Check that the build output paths match the upload patterns
- Verify the platform-specific build succeeded
- Check available disk space and network connection
