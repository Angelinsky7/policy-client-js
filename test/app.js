function log() {
    document.getElementById('results').innerText = '';

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerHTML += msg + '\r\n';
    });
}

function getPolicy() {
    mgr.setToken('eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjOWRmMDk1MjkyNDhjZTA2M2ZiODg5ZWZhNTRmYjM5IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NTc4NzY3MTksImV4cCI6MTU1Nzg4MDMxOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAxIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9yZXNvdXJjZXMiLCJhcGkxIiwicG9saWN5Il0sImNsaWVudF9pZCI6InNwYSIsInN1YiI6IkFsaWNlIiwiYXV0aF90aW1lIjoxNTU3ODc2NjkxLCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhcGkxIiwicG9saWN5Iiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.Llbz3v-eCE-Z4te7p5NojmAb8MYSRk3Df5s-BSRghdCjM2AE__gdOSIkgN72q3SYGhU_-wIJt2hmCAx0SU5DaTKicklxZ-CGDbRKEp_xYygegeZyMAWwvo-gA5NuawmY_c9qVNykCAkSmnOmBzEidw5LbDG2TJuv732tW_2Xysz9k95MLmypd-TX5ou5su9vqYrKewPxgolmttyTA0VSfIFdAFRLcckADi0CATalNxMFpERQIjnTPc2WHHDnfKA6-93plLq5vfZkyHA3Sa8FX0csH1dwMu0ZbfJZWCMmb0s0YQjJvNz2VkpgpGK2AIdSIi2TH4faSyi0GO-q4c3S8Q');
    mgr.getPolicy().then(p => {
        console.log('getPolicy', p);
    });     
}

function clean(){
    mgr.removePolicy();
}

var config = {
    authority: "http://localhost:5002",
    clientId: 'spa',
    requireHttpsMetadata: false
}

var mgr = new Posc.PolicyManager(config);
document.getElementById("getPolicy").addEventListener("click", getPolicy, false);
document.getElementById("clean").addEventListener("click", clean, false);