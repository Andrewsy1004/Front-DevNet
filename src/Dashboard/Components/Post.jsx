

import { useEffect, useState } from "react";

import { GetAllPosts } from "../Helpers";
import { Loader } from "../../Components";
import { PostCard, PostModal } from "../Cards";


export const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await GetAllPosts();
      if (response.ok) {
        setPosts(response.posts);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePostUpdated = () => {
    fetchPosts();
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-8 px-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Ofertas de Trabajo Disponibles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} openModal={openModal} handlePostUpdated={handlePostUpdated} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PostModal selectedPost={selectedPost} closeModal={closeModal} />
      )}

    </div>
    
  );
};
