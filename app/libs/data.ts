export async function upload2Api(params: any) {
    await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify(params),
    })
}

export async function downloadPosts(params: any) {
    const response = await fetch('/api/download', {
        method: 'POST',
        body: JSON.stringify(params),
    })

    const body = await response.json()
    return body
}

export async function upload2Imgur(params: File) {
    try {
        console.log(params.name)
        //let base64Img = await getBase64(params);
        const parm = new FormData();
        parm.append('image', params)
        /*if (typeof base64Img == 'string') {
            base64Img = base64Img.replace(/^data:.+base64,/, '')
            parm.append('image', base64Img)
            parm.append('type', 'base64')
        }*/

        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: 'Client-ID 3323c16a5b7b123',
            },
            body: parm,
        })

        if (response.ok) {
            const resp = await response.json()
            console.log(`Successfully delivered your precious image to Imgur. ${resp.data.link}`)
            return resp.data.link
        } else {
            console.log(`Error occured while uploading an Image. status: ${response.status}}`);
            return null
        }
    } catch (e) {
        console.error('Caught an error while uploading to imgur:', e)
        return null
    }
}