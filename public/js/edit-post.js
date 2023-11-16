const editPostFormHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector("#post-title-input").value.trim();
    const postContent = document.querySelector("#post-content-input").value.trim();

    const postId = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1];
      
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
            post_id: postId,
            title: postTitle,
            content: postContent 
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
      
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector(".edit-post-form")
    .addEventListener("submit", editPostFormHandler);