import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage, 350, 250)}
            alt={title}
            className="rounded-xl"
          />
          <div className="w-full pt-1 text-center">
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
