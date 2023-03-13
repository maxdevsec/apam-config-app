# Local Build of a Docker Image for the config-app

## Build the image

````
docker build -f docker/Dockerfile -t config.app:v0.1 .
````


## Inspecting an interim stage of the build

The image build can be run to generate an image stopping at a point in the build process.  Adding the following entrypoint to the Dockerfile will allow running the container at that state.

````
ENTRYPOINT [ "tail", "-f", "/dev/null" ]
````