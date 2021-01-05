import React from 'react'
import { Route } from 'react-router-dom'
import CollectionPageContainer from '../collection/collection.container'
import { connect } from 'react-redux'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container'

const ShopPage = ({match, fetchCollectionsStart}) => {
  React.useEffect(()=> {
    fetchCollectionsStart()
  }, [fetchCollectionsStart])

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
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)