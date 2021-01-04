import React from 'react'
import CollectionsOverview from '../../components/collection-overview/collection-overview'
import { Route } from 'react-router-dom'
import CollectionPage from '../collection/collection'
import { connect } from 'react-redux'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selector'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  componentDidMount() {
    this.props.fetchCollectionsStartAsync()
  }

  render() {
    const { match, isFetchingCollection, isCollectionLoaded } = this.props
    return (
      <div className='shop-page'>
        <Route 
          exact 
          path={`${match.path}`} 
          render={(props) => <CollectionsOverviewWithSpinner isLoading={isFetchingCollection} {...props} />} 
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
        />
      </div>
    )
  }
} 

const mapStateToStateToProps = createStructuredSelector({
  isFetchingCollection: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToStateToProps, mapDispatchToProps)(ShopPage)