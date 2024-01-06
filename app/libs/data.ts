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
        const form = new FormData();
        form.append('image', params)
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: 'Client-ID 3323c16a5b7b123',
            },
            body: form,
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