<script setup>
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'


let aaa = {
    headers: {
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '"Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-arch': '"x86"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version': '"112.0.1722.7"',
        'sec-ch-ua-full-version-list': '"Chromium";v="112.0.5615.20", "Microsoft Edge";v="112.0.1722.7", "Not:A-Brand";v="99.0.0.0"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-platform-version': '"15.0.0"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-ms-client-request-id': uuidv4(),
        'x-ms-useragent': 'azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32',
        'cookie': `_U=115RnO4P0Bu8YohSE2SsRIA_Y5vzqCOw4QOqEdlV7xAfkdG6rWK2t6Wb2RbLOFC46qbANlr6kDgDPqD_tUVCFm2cC2uzh6Gp2dS_sGdgU7aDbIDYCdRFba6jjFLVan6L79oYpCWoahYXkGyBe_RRcxe9V5MxFo-ynSy3RQW8MJgaDgSbhUoMsQRQpTk9PFscrfdh-jvHjzu-yQQurBb2mcQ`,
        'Referer': 'https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx',
        'Referrer-Policy': 'origin-when-cross-origin',
        // Workaround for request being blocked due to geolocation
        'x-forwarded-for': '1.1.1.1',
    }
}
onMounted(() => {
    requestInterceptor('https://www.bing.com/turing/conversation/create', aaa)
        .then(res => {
            console.log(res);
        });

    fetchWrapper('/turing/conversation/create',aaa)

    fetch('https://www.bing.com/turing/conversation/create', {
        headers: {
            'accept': 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'sec-ch-ua': '"Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"',
            'sec-ch-ua-arch': '"x86"',
            'sec-ch-ua-bitness': '"64"',
            'sec-ch-ua-full-version': '"112.0.1722.7"',
            'sec-ch-ua-full-version-list': '"Chromium";v="112.0.5615.20", "Microsoft Edge";v="112.0.1722.7", "Not:A-Brand";v="99.0.0.0"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua-platform-version': '"15.0.0"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-ms-client-request-id': uuidv4(),
            'x-ms-useragent': 'azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32',
            'cookie': `_U=115RnO4P0Bu8YohSE2SsRIA_Y5vzqCOw4QOqEdlV7xAfkdG6rWK2t6Wb2RbLOFC46qbANlr6kDgDPqD_tUVCFm2cC2uzh6Gp2dS_sGdgU7aDbIDYCdRFba6jjFLVan6L79oYpCWoahYXkGyBe_RRcxe9V5MxFo-ynSy3RQW8MJgaDgSbhUoMsQRQpTk9PFscrfdh-jvHjzu-yQQurBb2mcQ`,
            'Referer': 'https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx',
            'Referrer-Policy': 'origin-when-cross-origin',
            // Workaround for request being blocked due to geolocation
            'x-forwarded-for': '1.1.1.1',
        }
    }).then(res => res.json())
        .then(data => console.log(data))

})

function GET(req) {
    console.log(req);
}

const BASE_URL = 'https://www.bing.com';

async function fetchWrapper(url, options) {
    const newUrl = `${BASE_URL}${url}`;
    return await fetch(newUrl, options);
}

async function requestInterceptor(url, options) {
    // 在这里添加请求拦截逻辑
    console.log('请求开始', url, options);

    const response = await fetch(url, options);

    // 在这里添加响应拦截逻辑
    console.log('响应结束', response);

    return response;
}

function requestBing() {

}

</script>

<template></template>

<style scoped></style>