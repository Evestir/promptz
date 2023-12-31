'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./postCard";
import { downloadPosts } from "@/app/libs/data";

interface postDataSchema {
    id: string;
    url: string[];
    title: string;
    posPrompt: string;
    negPrompt: string;
    view: number;
    createdAt: any;
}

const PostBoard = () => {
    const [posts, setPosts] = useState<postDataSchema[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)

    const loadMorePosts = async () => {
        setIsLoading(true)

        const postData = {
            page: 0,
        }
        postData.page = page
        const newPosts = await downloadPosts(postData)
        console.log(newPosts)
        setPosts([...posts, ...newPosts])
        setPage(page + 1)
        setIsLoading(false)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
              if (entries.some(entry => entry.isIntersecting)) {
                loadMorePosts()
                setPage(prevPage => prevPage + 1);
              }
            },
            {
              root: null,
              rootMargin: '0px',
              threshold: 1.0,
            }
        );
        const target = document.getElementById('load-more-trigger');
        if (target) observer.observe(target);
    
        return () => {
        if (target) observer.unobserve(target);
        };
    }, [page])

    return (
        <div>
            {posts.map(post => {
             return <PostCard createdAt={post.createdAt} url={post.url} id={post.id} view={post.view} title={post.title} posPrompt={post.posPrompt} negPrompt={post.negPrompt}/>
            })}
            <div id="load-more-trigger" />
        </div>
    )
}

export default PostBoard