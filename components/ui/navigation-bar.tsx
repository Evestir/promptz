'use client'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { FaGithub } from "react-icons/fa";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Label } from "./label";
import { Button } from "./button";
import PostForm from "./postForm";
import Image from "next/image";
import styles from "@/app/styles/styles.module.css"

const NavBar = () => {
    return (
        <div className="w-full fixed z-50">
            <div className="w-full h-[60px] opacity-55 absolute bg-neutral-900"></div>
            <div className="border-b justify-between backdrop-blur-md h-[60px] bg-opacity-80 flex w-full border-opacity-70 border-stone-800">
                <div className="flex ml-10 justify-start items-center">
                    <Image src='/PLogoG.png' className="mt-4" sizes="100vw" width={80} height={80} alt='' />
                    <p className="-ml-2 text-stone-200 text-2xl font-medium">rom</p>
                    <p className="text-stone-500 text-2xl font-medium">ptz</p>
                </div>
                <AlertDialog>
                <NavigationMenu className="mr-28 justify-end">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Post</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-4">
                                <div className=" w-[240px]">
                                    <AlertDialogTrigger asChild>
                                        <Button className="bg-gradient-to-b h-[200px] focus:shadow-md flex w-full from-zinc-900 opacity-55 to-zinc-800 text-gray-50 font-medium text-lg">Click here to post!</Button>
                                    </AlertDialogTrigger>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>About</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-4">
                                <div className="w-[240px] flex-col gap-3">
                                    <p className="text-sm leading-tight text-muted-foreground">
                                        Beautifully designed webpage built with Radix UI and Tailwind CSS for the purpose of sharing Stable Diffusion Prompts
                                    </p>
                                    <div className="flex justify-between">
                                        <p className="mt-4 text-xs leading-tight text-muted-foreground">
                                            Developed By Vestir
                                        </p>
                                        <div className="right-0 bottom-0">
                                            <FaGithub />
                                        </div>
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <PostForm />
                    </AlertDialogHeader>
                </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default NavBar;