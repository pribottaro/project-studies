import './styles.css';
import { Component } from 'react';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
    state = {      
      posts : [],
      allPosts: [],
      page: 0,
      postsPerPage: 2
    }

    timeoutUpdate = null;

    componentDidMount() {      
       this.loadPosts();
    }

    componentDidUpdate() {  
      console.log('Aqui está minha props', this.props)   
    }

    componentWillUnmount() {      
    }

    loadPosts = async () => {
      const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
      const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

      const { page, postsPerPage } = this.state;

      const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

      const postsJson = await posts.json();

      const photosJson = await photos.json();

      const postsAndPhotos = postsJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url}
      })

      this.setState({
        posts: postsAndPhotos.slice(page, postsPerPage),
        allPosts: postsAndPhotos
      });
    }

  handleTimeOut = () => {
    const { posts } = this.state;
    posts[0].title = 'O título mudou';

    setTimeout(() => {
      this.setState({ posts });
    }, 1000)
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
      posts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
    : posts;
    
    return(
      <section className="container">
        <div class="search-container">
          {!!searchValue && (          
            <h1>Search Value: {searchValue}</h1>          
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>  
       
        <Posts posts={filteredPosts} />      

        <div className='button-container'>
          {!searchValue && (
            <Button 
            text='More load posts'
            onClick={this.loadMorePosts}
            disabled={false}
          />  
          )}          
        </div>      
      </section>
    )
  }
}

export default Home;
