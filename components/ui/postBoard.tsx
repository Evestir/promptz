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

const PostBoard = () => {
    const [posts, setPosts] = useState<postDataSchema[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState<number>(0)

    const loadMorePosts = async () => {
        setIsLoading(true)

        console.log(`Current page: ${page}`)

        const postData = {
            page: page,
        }
        postData.page = page
        const newPosts = await downloadPosts(postData)
        console.log(newPosts)
        setPosts([...posts, ...newPosts])
        setPage(prevPage => prevPage + 1)
        setIsLoading(false)
    }

    const observerTarget = useRef(null);

    useEffect(() => {
        loadMorePosts()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
              if (entries[0].isIntersecting) {
                loadMorePosts()
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
    }, [observerTarget])

    return (
        <ImageList variant="masonry" cols={3} gap={18} className="h-full w-full">
            {posts.map(post => {
             return <ImageListItem key={post.id} className="m-0">
                    <PostCard createdAt={post.createdAt} url={post.url} id={post.id} view={post.view} title={post.title} posPrompt={post.posPrompt} negPrompt={post.negPrompt} model={post.model} sampler={post.sampler} sdVersion={post.sdVersion}/>
                </ImageListItem>
            })}
            <div ref={observerTarget}></div>
        </ImageList>
    )
}

export default PostBoard