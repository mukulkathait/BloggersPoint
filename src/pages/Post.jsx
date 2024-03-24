import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="flex justify-center">
          <div className="w-9/12 flex flex-col justify-center items-center text-center mb-4 relative rounded-xl p-2">
            <img
              src={appwriteService.getFilePreview(
                post.featuredImage,
                1100,
                500
              )}
              alt={post.title}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}

            <div className="w-full mb-6 pt-1 pb-1">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
