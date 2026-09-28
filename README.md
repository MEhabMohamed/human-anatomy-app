# Human Anatomy 3D Interactive App

An interactive 3D Human Anatomy sculpture web application built using Three.js and vanilla CSS/JavaScript.

## Features
- Interactive 3D anatomical structures with realistic lighting and materials.
- Organ and muscle inspection with educational data overlays.
- Camera controls (orbit, pan, zoom) optimized for desktop and mobile.

## Project Structure
```
├── index.html              # Main HTML entry point
├── style.css               # Application styling & layout
├── js/
│   ├── app.js              # Application controller & UI bindings
│   ├── database.js         # Anatomical structures & descriptions
│   ├── geometry-builder.js # Procedural 3D anatomical meshes
│   └── three-scene.js      # Three.js canvas setup, lights, & camera
├── package.json            # Scripts & project metadata
└── .gitignore              # Ignored files & folders
```

## Local Development

To run the app locally:
```bash
npm run dev
# or on Windows PowerShell if execution policies block .ps1:
npm.cmd run dev
```
Then navigate to `http://localhost:3000`.

---

## Transition from `gsutil` to `gcloud storage`

Google Cloud Storage has transitioned from the legacy Python-based `gsutil` tool to the faster, parallelized `gcloud storage` CLI.

### Command Reference Mapping

| Operation | Legacy `gsutil` Command | Modern `gcloud storage` Command |
| :--- | :--- | :--- |
| **Sync Directory to Bucket** | `gsutil rsync -r -x "<regex>" . gs://<bucket>` | `gcloud storage rsync . gs://<bucket> --recursive --exclude="<regex>"` |
| **Upload Files Recursively** | `gsutil cp -r <dir> gs://<bucket>` | `gcloud storage cp -r <dir> gs://<bucket>` |
| **List Bucket Contents** | `gsutil ls -r gs://<bucket>` | `gcloud storage ls gs://<bucket>/**` |
| **Configure Static Website** | `gsutil web set -m index.html -e index.html gs://<bucket>` | `gcloud storage buckets update gs://<bucket> --web-main-page-suffix=index.html --web-error-page=index.html` |
| **Grant Public Read Access** | `gsutil iam ch allUsers:objectViewer gs://<bucket>` | `gcloud storage buckets add-iam-policy-binding gs://<bucket> --member=allUsers --role=roles/storage.objectViewer` |
| **Remove Object** | `gsutil rm gs://<bucket>/<file>` | `gcloud storage rm gs://<bucket>/<file>` |

---

## Deployment to Google Cloud Storage

To deploy the static assets to your Google Cloud Storage bucket (`gs://human-anatomy-app-mo-91823`):

```bash
npm run deploy
# or on Windows:
npm.cmd run deploy
```

This runs:
```bash
gcloud storage rsync . gs://human-anatomy-app-mo-91823 --recursive --exclude=".*\.git.*,.*node_modules.*,package\.json,package-lock\.json,\.gitignore"
```

### Public Live URL
- [https://storage.googleapis.com/human-anatomy-app-mo-91823/index.html](https://storage.googleapis.com/human-anatomy-app-mo-91823/index.html)
