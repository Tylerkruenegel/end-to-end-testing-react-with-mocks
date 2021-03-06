import React from 'react';
import { connect } from 'react-redux';
import ArticleList from '../ArticleList';
import agent from '../../agent';
import { CHANGE_TAB } from '../../constants/actionTypes';

const YourFeedTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li test-id="my-feed-nav-item" className="nav-item">
        <a
          href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li test-id="global-feed-nav-item"className="nav-item">
      <a
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return (
    <li test-id="tag-filter-nav-item" className="nav-item">
      <a
        test-id="tag-nav-item"
        href=""
        className="nav-link active"
      >
        <i className="ion-pound" />
        {' '}
        {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({
    type: CHANGE_TAB, tab, pager, payload,
  }),
});

const MainView = props => (
  <div className="col-md-9">
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">

        <YourFeedTab
          token={props.token}
          tab={props.tab}
          onTabClick={props.onTabClick}
        />

        <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

        <TagFilterTab tag={props.tag} />

      </ul>
    </div>

    <ArticleList
      pager={props.pager}
      articles={props.articles}
      loading={props.loading}
      articlesCount={props.articlesCount}
      currentPage={props.currentPage}
    />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
