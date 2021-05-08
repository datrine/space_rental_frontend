const { S3 } = require('@aws-sdk/client-s3');
const s3 = new S3({ region: "us-east-1" });
async function isBucketExist(params) {

    let res = await s3.headBucket({
        Bucket: "da3nstrapibucket"
    })
    console.log(res.$metadata.httpStatusCode)
}