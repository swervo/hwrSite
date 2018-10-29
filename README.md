# Scribble web site

> Web site for supporting and promoting the activities and aims of the
> scribble team based in London


## Local install

``` bash
npm i
bower i
```

## Usage

``` bash
npm start
```

browse to [http://localhost:4000](http://localhost:4000)


# How to deploy to AWS (.zip method)

## Create archive

``` bash
git archive --format zip --output ~/Desktop/scribbleDeploy.zip master
```

or

```
git archive -o ~/Desktop/scribbleDeploy.zip HEAD
```

## upload to AWS

Navigate to:

browse to:

[AWS Scribble dashboard](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/dashboard?applicationName=Scribble&environmentId=e-znpyquqe5n)

Click the 'Upload and deploy' button and upload the .zip file created earlier.


# Status

10th Oct 2014: Initial framework in place.
22nd Oct 2014: Deployed to AWS
