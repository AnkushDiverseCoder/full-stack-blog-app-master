import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const PF="http://localhost:8000/images/";
  return (
    <div className="post text">
      {post.photo && (
        <Link to={`/post/${post._id}`} className="link">
          <img className="postImg" src={PF + post.photo} alt="" />
        </Link>
      )}
      <div className="postInfo ">
        <div className="postCats">
          {post.categories.map((item) => (
            <span className="postCat" key={post._id}>
              <Link
                className="link"
                to="http://localhost:8000/api/post?cat=Music"
              >
                {item.name}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
