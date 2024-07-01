import React from "react";
import { useQuery } from "react-query";

const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  const stories = await Promise.all(
    storyIds.slice(0, 10).map(async (id) => {
      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return storyResponse.json();
    })
  );
  return stories;
};

const Index = () => {
  const { data, error, isLoading } = useQuery("topStories", fetchTopStories);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stories</div>;

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-3xl text-center mb-4">Top Hacker News Stories</h1>
        <ul className="space-y-4">
          {data.map((story) => (
            <li key={story.id} className="p-4 border rounded-lg">
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {story.title}
              </a>
              <p className="text-gray-600">by {story.by}</p>
              <p className="text-gray-600">Score: {story.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;