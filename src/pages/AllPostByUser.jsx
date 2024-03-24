import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { Select } from "../components/index";
import { useForm } from "react-hook-form";

function AllPostByUser() {
  const { register } = useForm();
  const [posts, setPosts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all posts");
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService
      .getAllPostByUser(userData.$id, selectedStatus)
      .then((posts) => {
        console.log(posts);
        if (posts) {
          setPosts(posts.documents);
        }
      });
  }, [selectedStatus]);

  const handleStatusChange = (event) => {
    console.log(event.target.value);
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col flex-nowrap">
          <div className="mb-4 w-1/5 self-end">
            <Select
              options={["all posts", "active", "inactive"]}
              label="Status"
              {...register("status", { required: true })}
              onChange={handleStatusChange}
            />
          </div>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AllPostByUser;
