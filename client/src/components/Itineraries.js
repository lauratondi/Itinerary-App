import React, { Component } from 'react'
import Footer from './Footer';
import { connect } from 'react-redux';
import { fetchItineraryList } from '../store/actions/itineraryActions';
import userIcon from '../images/userIcon.png'
import { Link } from 'react-router-dom';
import CityCard from './CityCard';
import Activities from './Activities';
import Comments from './Comments';
import CommentsPost from './CommentsPost';
import { Button } from 'reactstrap';


class Itineraries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: '',
            // I need it for the child component CityCard

            showContent: true,
        }

        this.handleClick = this.handleClick.bind(this)

    }


    componentDidMount() {
        let city = window.location.pathname.split('/')[2]

        this.setState({ city })
        // I need the setState for the child component CityCard

        this.props.fetchItineraryList(city);
    }


    handleClick = (e) => {
        this.setState(prevState => ({
            showContent: !prevState.showContent
        }));
    }



    render() {
        const { itineraries } = this.props
        console.log(itineraries)
        console.log(this.props.itineraries)


        const itinerariesList = itineraries.map(itinerary => {


            return (
                <div className="itineraryItem" key={itinerary._id}>

                    <div className="user">
                        <img src={userIcon} alt="userPhoto" />
                        <p>UserName</p>
                    </div>

                    <div className="titleIt">
                        <h3> {itinerary.title} </h3>
                    </div>

                    <div className="detailsIt">
                        <p>Likes:{itinerary.rating}</p>
                        <br></br>
                        <p>{itinerary.duration}</p>
                        <br></br>
                        <p>{itinerary.price} </p>
                    </div>

                    <div className="hashtag">
                        <p>{itinerary.hashtag}</p>
                    </div>

                    <div className="viewAll">

                        {
                            this.state.showContent ?

                                <React.Fragment>
                                    <Button color="tranparent" id="show" onClick={this.handleClick} >
                                        <center> v View All v </center>
                                    </Button>
                                </React.Fragment>

                                : <React.Fragment>
                                    <Button color="tranparent" id="show" onClick={this.handleClick} >
                                        <center>Close</center>
                                    </Button>

                                    <Activities activities={itinerary.activities} />
                                    <Comments itineraryId={itinerary._id} />
                                    <CommentsPost />

                                </React.Fragment>
                        }



                    </div>

                </div>
            )
        })

        const { loading } = this.props;

        if (!loading)
            return (
                <div className="flex-container">

                    <CityCard city={this.state.city} />

                    <p>Available MYtineraries:</p>

                    <div className="itineraries-list">
                        {itinerariesList}
                    </div>

                    <Link to="/cities">
                        <center><p style={{ color: 'blue' }}>Chose another city...</p></center>
                    </Link>
                    <Footer />
                </div>
            )
        else
            return (
                <div>Loading...</div>
            )
    }
}

const mapStateToProps = state => {
    return {
        itineraries: state.itineraries.itineraries,
        loading: state.itineraries.loading
    }
}

const mapDispatchProps = dispatch => {
    return {
        fetchItineraryList: (city) => dispatch(fetchItineraryList(city))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Itineraries);