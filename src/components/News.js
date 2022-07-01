import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';


class News extends Component {
  articles = [
    {
      source: {
        id: "abc-news-au",
        name: "ABC News (AU)",
      },
      author: "ABC News",
      title:
        "Cricket Australia in shock as Seven reportedly launches legal proceedings",
      description:
        "Cricket Australia responds to media reports claiming the Seven Network is commencing legal action against the organisation in an attempt to terminate its $450 million TV rights deal.",
      url: "http://www.abc.net.au/news/2022-06-30/cricket-australia-responds-to-seven-network-court-action-report/101198646",
      urlToImage:
        "https://live-production.wcms.abc-cdn.net.au/666ffcbcfb814b5e30db57914a76cd57?impolicy=wcms_crop_resize&cropH=2130&cropW=3786&xPos=0&yPos=394&width=862&height=485",
      publishedAt: "2022-06-30T07:33:03Z",
      content:
        'Cricket Australia (CA) says it is "astonished" by media reports claiming the Seven Network is commencing legal proceedings against the organisation in an bid to terminate its $450 million TV rights d… [+1893 chars]',
    },
    {
      source: {
        id: "bbc-sport",
        name: "BBC Sport",
      },
      author: "BBC Sport",
      title: "Shane Warne memorial - watch & follow updates",
      description:
        "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
      url: "http://www.bbc.co.uk/sport/live/cricket/60916236",
      urlToImage:
        "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
      publishedAt: "2022-03-30T08:22:26.498888Z",
      content:
        "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: "",
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: "",
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page:1
    };
  }
   async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff12ecd25bbf48f8b51349b37c60be92&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json()
    this.setState({articles: parsedData.articles,
        totalResults: parsedData.totalResults,
         loading:false})
  }
   handlePreviousClick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff12ecd25bbf48f8b51349b37c60be92&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parsedData= await data.json()
    this.setState({
        page: this.state.page-1,
        articles: parsedData.articles,
        loading:false
    })
  }
  
   handleNextClick=async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff12ecd25bbf48f8b51349b37c60be92&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData= await data.json()
        this.setState({
            page: this.state.page+1,
            articles: parsedData.articles,
            loading:false
        })
    }  
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsHub-Top Headlines</h2>
        {this.state.loading &&<Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0,45):""}
                  description={element.description?element.description.slice(0,88):""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-1"onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-1"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
