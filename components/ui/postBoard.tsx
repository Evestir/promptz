'use client'

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { downloadPosts } from "@/app/libs/data";
import { pages } from "next/dist/build/templates/app-page";
import { postDataSchema } from "@/app/libs/interfaces";
import Grid from '@mui/material/Grid'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { Loader2 } from "lucide-react";

const PostBoard = () => {
    const [posts, setPosts] = useState<postDataSchema[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState<number>(0)
    const [cols, setCols] = useState<number>(0)

    const loadMorePosts = async () => {
        setPage((prevPage) => prevPage + 1);
        console.log(`Current page: ${page}`)

        const postData = {
            page: page,
        }
        postData.page = page
        const newPosts = await downloadPosts(postData)
        console.log(newPosts)
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setIsLoading(false)
    }

    const observerTarget = useRef(null);

    const calcCols = (wWidth: any) => {
        const maxCols = Math.ceil(wWidth/500)
        if (maxCols < 2) {
            return 1
        }
        return maxCols
    }

    const handleResize = () => {
        setCols(calcCols(window.innerWidth))
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        setCols(calcCols(window.innerWidth))
    }, [])

    useEffect(() => {
        if (isLoading)
        loadMorePosts()
    }, [isLoading])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
              if (entries[0].isIntersecting) {
                setIsLoading(true)
              }
            },
            {
              threshold: 1.0,
            }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
    
        return () => {
        if (observerTarget.current) observer.unobserve(observerTarget.current);
        };
    }, [observerTarget.current])

    return (
        <div className="justify-center w-full items-center flex flex-col">
            <ImageList variant="masonry" cols={cols} gap={18} className="h-full w-full">
                {posts.map(post => (
                        <ImageListItem key={post.id} className="m-0">
                            <PostCard createdAt={post.createdAt} url={post.url} id={post.id} view={post.view} title={post.title} posPrompt={post.posPrompt} negPrompt={post.negPrompt} model={post.model} sampler={post.sampler} sdVersion={post.sdVersion}/>
                        </ImageListItem>
                    ))}
            </ImageList>
            <Loader2 size={30} opacity={isLoading ? 1 : 0} className={`animate-spin transition-all mt-20 mb-5`} ref={observerTarget}></Loader2>
        </div>

    )
}

export default PostBoard