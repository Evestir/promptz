export async function upload2Api(params: any) {
    const result = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify(params),
    })

    return await result.json()
}

export async function deletePost(params:any) {
    const response = await fetch('/api/delete', {
        method: 'POST',
        body: JSON.stringify(params),
    })

    const body = await response.json()
    return body
}

export async function downloadPosts(params: any) {
    const response = await fetch('/api/download', {
        method: 'POST',
        body: JSON.stringify(params),
    })

    const body = await response.json()
    return body
}

const convert = async (source: File, type: string) => {
    let image = await createImageBitmap(source);

    let canvas = new OffscreenCanvas(image.width, image.height);
    let context = canvas.getContext("2d");
    if (context != null)
    context.drawImage(image, 0, 0);

    let result = await canvas.convertToBlob({ type });

    image.close();
    return result;
}

export async function upload2Imgur(params: File, id: string) {
    try {
        const form = new FormData()

        let image = params
        if (params.name.endsWith('.webp') || params.name.endsWith('.jpg')) {
            console.log(`WebP or JPG file type is detected!`)

            const a = await convert(params, 'png')
            image = new File([a], "iMaGe") 
        }
        form.append('image', image)

        console.log(params.name)
        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${id}`,
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