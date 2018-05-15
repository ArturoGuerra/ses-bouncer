#!/usr/bin/env sh
S3_FILE=arturonetses.zip
BUCKET=arturonet-cdn
rm -rf $S3_FILE
zip -r $S3_FILE * -x 'handler.sh'
aws s3 cp ./$S3_FILE s3://$BUCKET/
rm -rf $S3_FILE
