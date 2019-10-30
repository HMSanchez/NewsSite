import React from 'react';
import './App.css';

class NewsButton extends React.Component {
  handleClick = () => {
    document.getElementById('welcomeHeader').style.display = 'none';
    this.props.onClickFunction(this.props.sourceid);
    if (this.props.SourceName.endsWith('s')) {
      document.getElementById('header').innerHTML = this.props.SourceName + "' Latest Headlines";
    } else {
      document.getElementById('header').innerHTML = this.props.SourceName + "'s Latest Headlines";
    }
    if (document.getElementById('search').value !== '') {
      document.getElementById('subBtn').disabled = false;
    } else {
      document.getElementById('subBtn').disabled = true;
    }


  };

  render() {
    return (
      <div className="btn" onClick={this.handleClick}>
        <span><img src={this.props.icon} alt="" style={{ height: 40, width: 40, verticalAlign: 'middle', margin: 5 }} />
          {this.props.SourceName}
        </span>
      </div>
    );
  }
}


const changeid = () => {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }

}

const titleCase = str => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

const Articles = ({ title, author, description, url, urlToImage }) => {
  document.getElementById('header').style.display = 'block';
  if (document.getElementById('search').value !== '') {
    document.getElementById('subBtn').disabled = false;
  } else {
    document.getElementById('subBtn').disabled = true;
  }
  document.getElementById('sticky').style.left =  0;
  document.getElementById('sticky').style.bottom =  0;
  document.getElementById('sticky').style.position =  'absolute';
  document.getElementById('sticky').style.textAlign =  'center';
  document.getElementById('sticky').style.width =  '100%';
  document.getElementById('sticky').style.display =  'block';
  return (
    <div>

      <table>
        <tbody>
          <tr>
            <td>
              <div id="imgdiv">
                <a style={{ textDecoration: "none", }} href={url} target="_blank">
                  <img className="articleImage" src={urlToImage} alt="" />
                </a>
              </div>
            </td>
            <td className="articleDetails"><h3>{title}</h3><br /><a style={{ textDecoration: "none", color: "#E857B8", fontSize: 16 }} href={url} target="_blank">Go to Source Page</a></td>
            <td className="articleDetails"><p><em>{author}</em></p><br /><p>{description}<br /></p></td>
          </tr>

        </tbody>

      </table>
    </div>

  );
}

class NewsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      newssource: '',
      source_id: '',
      articleslength: 0,
      submitted: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  sourceChange = (sourceid) => {
    // this.setState({ newssource: sourceid })
    // this.grabArticles();
    console.log(sourceid);
    this.setState({ newssource: sourceid }, function stateUpdateComplete() {
      // console.log(this.state.newssource)
      this.grabArticles();
    }.bind(this));
  }


  handleChange(evt) {
    this.setState({ newssource: evt.target.value.toLowerCase().replace(' ', '-') });
    if (evt.target.value !== '') {
      document.getElementById('subBtn').disabled = false;
    } else {
      document.getElementById('subBtn').disabled = true;
    }

  }
  handleSubmit(evt) {
    document.getElementById('welcomeHeader').style.display = 'none';
    let str = document.getElementById('header').innerHTML;
    let fix = '';
    str = this.state.newssource.replace('-', ' ');
    fix = titleCase(str);
    console.log(fix);

    if (fix.endsWith('s')) {
      document.getElementById('header').innerHTML = fix + "' Latest Headlines";
    } else {
      document.getElementById('header').innerHTML = fix + "'s Latest Headlines";
    }


    this.setState({ query: this.state.newssource });
    console.log(this.state.newssource);

    this.grabArticles();
    document.getElementById('search').value = '';
    evt.preventDefault();
  }

  grabArticles() {
    console.log("Inside grab: " + this.state.newssource);

    let images = [];
    const BASE_URL = 'https://newsapi.org/v2/top-headlines?';
    let FETCH_URL = `${BASE_URL}sources=${this.state.newssource}&apiKey=${API}`;

    fetch(FETCH_URL, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        images = document.getElementsByTagName('img');
        console.log(images);


        this.setState({ articleslength: json.articles.length });
        for (let i = 0; i < this.state.articleslength; i++) {
          // unique/dynamic key for each description. defining keys in key value
          this.setState({ [`title_${i}`]: json.articles[i].title });
          this.setState({ [`author_${i}`]: json.articles[i].author });
          this.setState({ [`description_${i}`]: json.articles[i].description });
          this.setState({ [`url_${i}`]: json.articles[i].url });
          this.setState({ [`urlToImage_${i}`]: json.articles[i].urlToImage });
        }
      });
  }



  render() {
    var articles = [];
    for (let i = 0; i < this.state.articleslength; i++) {
      articles.push(<Articles key={i} title={this.state[`title_${i}`]} author={this.state[`author_${i}`]} description={this.state[`description_${i}`]}
        url={this.state[`url_${i}`]} urlToImage={this.state[`urlToImage_${i}`]} />);
    }
    return (
      <div className="wrapper">
        <div className="navDiv">
          <div className="topnav" id="myTopnav">
            <div className="dropdown">
              <img src='sumfill.png' style={{ height: 62, width: 62 }} alt="" />
            </div>
            <div className="dropdown">
              <button className="dropbtn">US Magazine
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <NewsButton sourceid={"wired"} icon={"https://icon-locator.herokuapp.com/icon?url=https://www.wired.com&size=70..120..200"} SourceName={"Wired"} onClickFunction={this.sourceChange} />
                <NewsButton sourceid={"fortune"} icon={"https://icon-locator.herokuapp.com/icon?url=http://fortune.com&size=70..120..200"} SourceName={"Fortune"} onClickFunction={this.sourceChange} />
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Sports
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <NewsButton sourceid={"espn"} icon={"https://icon-locator.herokuapp.com/icon?url=http://espn.go.com&size=70..120..200"} SourceName={"ESPN"} onClickFunction={this.sourceChange} />
                <NewsButton sourceid={"nfl-news"} icon={"https://icon-locator.herokuapp.com/icon?url=http://www.nfl.com/news&size=70..120..200"} SourceName={"NFL News"} onClickFunction={this.sourceChange} />
                <NewsButton sourceid={"bleacher-report"} icon={"https://icon-locator.herokuapp.com/icon?url=http://www.bleacherreport.com&size=70..120..200"} SourceName={"Bleacher Report"} onClickFunction={this.sourceChange} />
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">US News
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <NewsButton sourceid={"the-new-york-times"} icon={"https://icon-locator.herokuapp.com/icon?url=http://www.nytimes.com&size=70..120..200"} SourceName={"New York Times"} onClickFunction={this.sourceChange} />
                <NewsButton sourceid={"the-washington-post"} icon={"https://icon-locator.herokuapp.com/icon?url=https://www.washingtonpost.com&size=70..120..200"} SourceName={"Washington Post"} onClickFunction={this.sourceChange} />
                <NewsButton sourceid={"abc-news"} icon={"https://icon-locator.herokuapp.com/icon?url=http://abcnews.go.com&size=70..120..200"} SourceName={"ABC News"} onClickFunction={this.sourceChange} />
                <NewsButton sourceid={"usa-today"} icon={"https://icon-locator.herokuapp.com/icon?url=http://www.usatoday.com/news&size=70..120..200"} SourceName={"USA Today"} onClickFunction={this.sourceChange} />
                <NewsButton sourceid={"cnn"} icon={"https://icon-locator.herokuapp.com/icon?url=http://us.cnn.com&size=70..120..200"} SourceName={"CNN"} onClickFunction={this.sourceChange} />
              </div>
            </div>
            <div className="search-container">
              <form onSubmit={this.handleSubmit}>
                <input className="round" id='search' type="text" placeholder="Search.." onChange={this.handleChange} name="search" />
                <button className="round" type="submit" id="subBtn" disabled><i className="fas fa-search"></i></button>
              </form>
            </div>
            <a className="icon" style={{ color: 'black', fontSize: 40 }} onClick={changeid}>&#9776;</a>
          </div>
        </div>

        <div className="articlesDiv">
          <img id="headerImage" alt="" style={{ height: 50, width: 50, justifyContent: 'center', alignContent: 'center' }} />
          <h1 id="welcomeHeader" style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center', color: '#DC60C7', letterSpacing: 1 }}>Welcome. Select or search for a source</h1>
          <h1 id="header" style={{ display: "none", justifyContent: 'center', alignContent: 'center', textAlign: 'center', color: '#DC60C7', letterSpacing: 1 }}></h1>
          {articles}
        </div>
        <br />
        <br />
        <footer style={{marginTop: 120}} id="sticky">
        {/* <img src='sumfill.png' style={{ height: 62, width: 62 , verticalAlign: 'middle', margin: 5}} alt="" /> */}
          <p style={{color: 'rgb(58, 105, 155)', marginTop: 100}}> Powered by the News API. &copy;2018 Harrisen Sanchez.</p>
        </footer>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    
    return (
      <div className="mainContainer">
        <NewsContainer />
      </div>
    );
  }
}

export default App;