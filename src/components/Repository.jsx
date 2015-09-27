import React from 'react';
import Parse from 'parse';
import Gravatar from 'react-gravatar';
import ParseReact from 'parse-react';
import FontAwesome from 'react-fontawesome';

export default class Repository extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.style = {
      repoItem: {
        width: "350px",
        height: "250px",
        background: "url(https://s3-us-west-2.amazonaws.com/chorum/item.png)",
        float: "left",
        padding: "5px",
        boxShadow: "1px 0 3px #ccc",
        borderRadius: "3px",
        color: "white",
        margin: "15px"
      },
      repoLink: {
        color: "white",
        lineHeight: "3em",
        fontSize: "3em",
        width: "100%"
      },
      repoInfo: {
        textAlign: "right",
        color: "white"
      },
      repoInfoInner: {
        marginTop: "10px",
        color: "white"
      },
      repoInfoName: {
        textAlign: "center",
        fontSize: "1.2em",
        marginBottom: "0.7em",
        marginTop:  "0.7em"
      },
      repoLinkStyle: {
        color: "white"
      }
    }
    this.user = Parse.User.current();
    this.repo = this.props.repo;
    this.userGravatar = this.userGravatar.bind(this);
  }
  componentDidMount() {
    var rele = this.repo.relation("collaborators");
    var query = rele.query();
  
    query.find({
      success: (users) =>{
        this.setState({ users });
      }
    });  
  }

  render() {
    return (
        <li key={this.repo.get("objectId")} style={this.style.repoItem} className="row">
          <div className="col-md-12">
            <div className="col-md-6">{(this.state.users) ? this.userGravatar() : '' }</div>
            <div className="col-md-6" style={this.style.repoInfo}>
            <div className="md-col-12" style={this.style.repoInfoInner}>{`${this.repo.get("tempo")} BPM`} | {this.repo.get("key")}</div>
            </div>
            </div>
            <div className="col-md-12" style={this.style.repoInfoName}>
            <a style={this.style.repoLink} href={`#/projects/${this.user.id}/${this.repo.id}`}>
            { this.repo.get("name") }
            </a>
            </div>
            <div className="col-md-12" style={{color: "white"}}>
            <div className="col-md-10"></div>
            <div className="col-md-2"><a style={ this.style.repoLinkStyle } href={`#/projects/${this.user.id}/${this.repo.id}`}><FontAwesome name="pencil" size="2x" /></a></div>
          </div>
        </li>
        );
  }
  userGravatar() {
    return this.state.users.map((user) => { 
      return <Gravatar className="img-circle" style={{ marginTop: "5px", marginRight: "2px" }} email={user.getEmail()} size={25} rating="pg" />
    });
  }
}
