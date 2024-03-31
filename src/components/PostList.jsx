import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { notlariAlAPI } from "../store/actions";

const PostList = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(notlariAlAPI());
  }, []);
  const notlar = useSelector((store) => store.notlar);

  return notlar.length === 0 ? (
    <div className="beyazKutu text-center p-6">Hiç notunuz yok</div>
  ) : (
    <div>
      {notlar.map((not) => (
        <Post item={not} key={not.id} />
      ))}
    </div>
  );
};

export default PostList;
