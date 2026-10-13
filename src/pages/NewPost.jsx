import { useState } from "react";

const inputClass = "w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500";
const labelClass = "block text-sm font-medium text-gray-800 mb-2";

function getTags(tagText) {
  return tagText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default function NewPost() {
  const [postType, setPostType] = useState("question");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleAbstract, setArticleAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [articleTags, setArticleTags] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const title = postType === "question" ? questionTitle.trim() : articleTitle.trim();
    const tagsText = postType === "question" ? questionTags : articleTags;
    const tags = getTags(tagsText);

    if (!title) {
      window.alert("Please enter a title.");
      return;
    }
    if (title.length < 5 || title.length > 120) {
      window.alert("The title must contain between 5 and 120 characters.");
      return;
    }

    if (postType === "question") {
      const description = questionDescription.trim();
      if (!description) {
        window.alert("Please describe your problem.");
        return;
      }
      if (description.length < 10 || description.length > 5000) {
        window.alert("Your question description must contain between 10 and 5000 characters.");
        return;
      }
    } else {
      const abstract = articleAbstract.trim();
      const text = articleText.trim();

      if (!abstract) {
        window.alert("Please enter an abstract for your article.");
        return;
      }
      if (abstract.length < 10 || abstract.length > 500) {
        window.alert("The abstract must contain between 10 and 500 characters.");
        return;
      }
      if (abstract.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()).length > 1) {
        window.alert("Please keep the abstract to one paragraph.");
        return;
      }
      if (!text) {
        window.alert("Please enter the article text.");
        return;
      }
      if (text.length < 20 || text.length > 10000) {
        window.alert("The article text must contain between 20 and 10000 characters.");
        return;
      }
    }

    if (tags.length > 3) {
      window.alert("Please enter no more than 3 tags. Separate tags with commas.");
      return;
    }
    if (tags.some((tag) => tag.length > 30)) {
      window.alert("Each tag must be 30 characters or fewer.");
      return;
    }

    // C1 asks for a popup, not a backend publishing service.
    window.alert(`Your ${postType} has been submitted successfully!`);

    setQuestionTitle("");
    setQuestionDescription("");
    setQuestionTags("");
    setArticleTitle("");
    setArticleAbstract("");
    setArticleText("");
    setArticleTags("");
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 md:py-12">
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <header className="bg-gray-200 px-5 py-4">
          <h1 className="text-2xl font-bold text-gray-900">New Post</h1>
        </header>

        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-7">
          <fieldset>
            <legend className="font-semibold mb-3">Select Post Type:</legend>
            <div className="flex flex-wrap gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="postType"
                  value="question"
                  checked={postType === "question"}
                  onChange={() => setPostType("question")}
                  className="accent-cyan-700"
                />
                Question
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="postType"
                  value="article"
                  checked={postType === "article"}
                  onChange={() => setPostType("article")}
                  className="accent-cyan-700"
                />
                Article
              </label>
            </div>
          </fieldset>

          <section className="border-t border-gray-200 pt-6">
            <div className="bg-gray-100 rounded px-4 py-3 mb-5">
              <h2 className="text-lg font-semibold">What do you want to ask or share?</h2>
              <p className="text-sm text-gray-600 mt-1">
                {postType === "question"
                  ? "Add a clear question and explain the problem you need help with."
                  : "Share an article with a descriptive title, a short abstract and the full text."}
              </p>
            </div>

            {postType === "question" ? (
              <div className="space-y-5" key="question-form">
                <div>
                  <label htmlFor="question-title" className={labelClass}>Title</label>
                  <input
                    id="question-title"
                    type="text"
                    value={questionTitle}
                    onChange={(event) => setQuestionTitle(event.target.value)}
                    placeholder="Start your question with how, what, why, etc."
                    maxLength={120}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">5–120 characters</p>
                </div>

                <div>
                  <label htmlFor="question-description" className={labelClass}>Describe your problem</label>
                  <textarea
                    id="question-description"
                    value={questionDescription}
                    onChange={(event) => setQuestionDescription(event.target.value)}
                    placeholder="Explain what you have tried and where you need help."
                    rows={8}
                    maxLength={5000}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">10–5000 characters</p>
                </div>

                <div>
                  <label htmlFor="question-tags" className={labelClass}>Tags</label>
                  <input
                    id="question-tags"
                    type="text"
                    value={questionTags}
                    onChange={(event) => setQuestionTags(event.target.value)}
                    placeholder="Up to 3 tags, separated by commas (e.g. Java, React)"
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional. Enter no more than 3 tags.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-5" key="article-form">
                <div>
                  <label htmlFor="article-title" className={labelClass}>Title</label>
                  <input
                    id="article-title"
                    type="text"
                    value={articleTitle}
                    onChange={(event) => setArticleTitle(event.target.value)}
                    placeholder="Enter a descriptive title"
                    maxLength={120}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">5–120 characters</p>
                </div>

                <div>
                  <label htmlFor="article-abstract" className={labelClass}>Abstract</label>
                  <textarea
                    id="article-abstract"
                    value={articleAbstract}
                    onChange={(event) => setArticleAbstract(event.target.value)}
                    placeholder="Write a one-paragraph summary of your article."
                    rows={3}
                    maxLength={500}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">One paragraph, 10–500 characters</p>
                </div>

                <div>
                  <label htmlFor="article-text" className={labelClass}>Article Text</label>
                  <textarea
                    id="article-text"
                    value={articleText}
                    onChange={(event) => setArticleText(event.target.value)}
                    placeholder="Write the full article here."
                    rows={9}
                    maxLength={10000}
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">20–10000 characters</p>
                </div>

                <div>
                  <label htmlFor="article-tags" className={labelClass}>Tags</label>
                  <input
                    id="article-tags"
                    type="text"
                    value={articleTags}
                    onChange={(event) => setArticleTags(event.target.value)}
                    placeholder="Up to 3 tags, separated by commas (e.g. Java, React)"
                    className={inputClass}
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional. Enter no more than 3 tags.</p>
                </div>
              </div>
            )}
          </section>

          <div className="flex justify-end border-t border-gray-200 pt-5">
            <button
              type="submit"
              className="min-w-36 rounded bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 text-white font-semibold px-8 py-3"
            >
              Post
            </button>
          </div>
        </form>
      </section>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Demo only: a valid post displays a confirmation popup but is not stored or published.
      </p>
    </main>
  );
}
