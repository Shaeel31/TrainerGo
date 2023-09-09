import styled from 'styled-components'

export const SideContainer = styled.aside`
  background: #000000;
  padding: 24px 0;
  height: 100%;
  max-width: 200px !important;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px 50px 1fr 65px;
  gap: 8px;

  .ant-menu {
    height: calc(100vh - 270px);
    overflow: auto !important;
    min-height: 200px;

    ::-webkit-scrollbar-thumb {
      background: #000000;
    }
  }

  min-height: 500px;

  .ant-menu-inline,
  .ant-menu-vertical {
    border-right: none;
    width: calc(100% - 1px);
    position: relative;
  }

  .ant-menu-item {
    display: flex;
    align-items: center;
    font-size: 1.1em;
    color: #ffffff;
  }

  .ant-menu-item-active {
    color: #3cff8f;

    #icos {
      * {
        stroke: #3cff8f !important;
      }
    }
  }

  .ant-menu-item-selected {
    background-color: rgba(60, 255, 143, 0.09) !important;
    position: relative;
    color: #3cff8f;
    font-weight: 600;
    a {
      display: flex;
      align-items: center;
    }
    #icos {
      * {
        stroke: #3cff8f !important;
      }
    }
  }

  .ant-menu-item-selected:before {
    content: '';
    position: absolute;
    left: 0;
    border-left: 3px solid #3cff8f;
    height: 100%;
  }

  .ant-menu-item-icon {
    fill: #3cff8f !important;
  }

  .ant-menu-item:nth-last-child(2) {
    @media (min-height: 800px) {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
    }
  }

  .ant-menu-item:nth-last-child(1) {
    @media (min-height: 800px) {
      left: 0;
      right: 0;
      position: absolute;
      bottom: 66px;
    }
  }

  .ant-menu-inline-collapsed > .ant-menu-item {
    //display: flex;
    //justify-content: center;
    //padding: 0 8px;
  }
  .ant-menu-inline-collapsed {
    &-tooltip {
      img {
        display: none;
      }
    }
  }
  .ant-menu-item-disabled {
    //background-color: red;
    cursor: alias;

    //:hover {
    //  position: relative;
    //
    //  :after {
    //    content: 'coming soon';
    //    left: 0;
    //    bottom: 5px;
    //    position: absolute;
    //    color: red;
    //    z-index: 100;
    //  }
    //}
  }

  @media (max-width: 1336px) {
    .ant-menu-item {
      padding-right: 5px !important;
    }

    .ant-menu-title-content {
      display: none !important;
    }

    .ant-menu-vertical {
      //width: 78px !important;
      //padding: 0 calc(50% - 24px / 2) !important;
    }
  }
`
export const ProfileHeader = styled.div`
  padding: 14px;
  display: flex;
  justify-content: center;
`

export const TrenerGOLogo: any = styled.img.attrs((props: any) => ({
  src: props.source,
}))`
  width: 85%;
  @media (max-width: 1336px) {
    width: 60%;
  }
`

export const SearchStyle = styled.div`
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 1336px) {
    .ant-input-group-wrapper {
      .ant-input-affix-wrapper {
        width: 50px !important;
        height: 50px !important;
      }

      .anticon {
        padding-top: 8px;
        padding-left: 4px;
        font-size: 1.3em;
      }
    }
  }
`

export const ProfileBottom = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 14px;
  grid-template-columns: auto 1fr;
  margin: auto 0 0 0;
  a {
    display: block;
    width: 50px;
    height: 50px;
    &.active {
      img {
        border: 3px solid #3cff8f;
        border-left: none;
      }
    }
  }
  .ant-typography {
    padding-right:5px;
  }
`

export const ProfileAvatar: any = styled.img.attrs((props: any) => ({
  src: props.source,
}))`
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
`
