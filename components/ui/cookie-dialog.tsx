import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { toast } from "sonner"
import { useCookies } from 'next-client-cookies';

const CookieBox = () => {
    const cookies = useCookies()

    const [id, setId] = useState('')

    const saveKey = () => {
        if (id.length !== 15) {
            toast("Faild to save the ID", {
                description: "Please make sure to put genuine ID."
            })
            return
        }

        cookies.set('ImgurID', id)
        toast("Successfully saved ID", {
            description: "You can start uploading your own posts!"
        })
    }

    return (
       <div className="space-y-1 px-2 pb-2">
            <Label className="text-sm font-semibold">Imgur</Label>
            <Input value={id} onChange={e => { setId(e.currentTarget.value)}} className="transition-all duration-700"/>
            <Label className="text-xs font-normal">Insert your Imgur Client ID</Label>
            <Button onClick={saveKey} variant="outline" className="w-full">Save</Button>
       </div>
    )
}

export default CookieBox;