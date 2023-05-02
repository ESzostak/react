import { useState } from 'react';

import './styles.css';

import { Posts } from '../../posts/index.jsx';
import { loadPosts } from '../../../utils/load-posts';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >=  allPosts.length;

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
  : posts;

  const handleloadPosts = useCallback( async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(() => {
    handleloadPosts(0, postsPerPage);
  }, [handleloadPosts, postsPerPage]);
 

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }  

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
        )}
        
        <TextInput searchValue={searchValue} handleChange={handleChange}/>
      </div>
        

      {filteredPosts.length > 0 && (
        <Posts posts={ filteredPosts } />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts!</p>
      )}
      
        <div className="button-container">
          {!searchValue && (
            <Button 
              text="Load more Posts"
              onClick={loadMorePosts} //onClick = atributo
              disabled={noMorePosts}
            />
          )}  
        </div>  
    </section>  
  ); 
}  

export default Home;
