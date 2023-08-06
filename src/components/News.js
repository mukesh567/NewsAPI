import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {

  static defaultsProps = {
    country: 'in',
    pageSize: 2,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06c2fd278cc74a659666362ea141fb33&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06c2fd278cc74a659666362ea141fb33&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.updateNews();
  }

  //   handlePrevClick=async()=>{
  //     console.log("previous page!");
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06c2fd278cc74a659666362ea141fb33&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     page:this.state.page-1,
  //     articles:parsedData.articles,
  //     loading:false
  //     })
  //     this.setState({page:this.state.page-1});
  //     this.updateNews();
  //   }
  //   handleNextClick=async()=>{
  //       console.log("Next page!");
  //   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
  //   {
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06c2fd278cc74a659666362ea141fb33&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   this.setState({
  //     page:this.state.page+1,
  //     articles:parsedData.articles,
  //     loading:false
  //     })
  // this.setState({page:this.state.page+1});
  // this.updateNews();
  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=06c2fd278cc74a659666362ea141fb33&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 71) : ""}
                      description={element.description ? element.description.slice(0, 95) : ""}
                      imageUrl={element.urlToImage}
                      Newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
