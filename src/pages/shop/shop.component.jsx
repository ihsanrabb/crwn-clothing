import React from 'react'
import { Route } from 'react-router-dom'
import CollectionPageContainer from '../collection/collection.container'
import { connect } from 'react-redux'
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container'

const ShopPage = ({match, fetchCollectionsStartAsync}) => {
  React.useEffect(()=> {
    fetchCollectionsStartAsync()
  }, [])

  return (
    <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} 
        component={CollectionOverviewContainer}
      />
      <Route 
        path={`${match.path}/:collectionId`} 
        component={CollectionPageContainer}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage)