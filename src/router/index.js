import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import a404 from '@/components/404'
import login from '@/components/login'
import orders from '@/components/orders/orders'

import orderIndex from '@/components/orders/orderCenter/orderCenter-Laundry/index'
import newLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/new'
import cancelLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/cancel'
import endLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/end'
import hangLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/hang'
import returnLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/return'
import inboundLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/inbound'
import outLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/out'
import sentLaundry from '@/components/orders/orderCenter/orderCenter-Laundry/sent'
import designerIndex from '@/components/orders/orderCenter/orderCenter-Designer/index'
import newDesigner from '@/components/orders/orderCenter/orderCenter-Designer/new'
import cancelDesigner from '@/components/orders/orderCenter/orderCenter-Designer/cancel'
import endDesigner from '@/components/orders/orderCenter/orderCenter-Designer/end'
import hangDesigner from '@/components/orders/orderCenter/orderCenter-Designer/hang'
import returnDesigner from '@/components/orders/orderCenter/orderCenter-Designer/return'
import inboundDesigner from '@/components/orders/orderCenter/orderCenter-Designer/inbound'
import outDesigner from '@/components/orders/orderCenter/orderCenter-Designer/out'
import sentDesigner from '@/components/orders/orderCenter/orderCenter-Designer/sent'
import furnitureIndex from '@/components/orders/orderCenter/orderCenter-Furniture/index'
import cancelFurniture from '@/components/orders/orderCenter/orderCenter-Furniture/cancel'
import endFurniture from '@/components/orders/orderCenter/orderCenter-Furniture/end'
import newFurniture from '@/components/orders/orderCenter/orderCenter-Furniture/new'
import shipFurniture from '@/components/orders/orderCenter/orderCenter-Furniture/ship'
import homeFurniture from '@/components/orders/orderCenter/orderCenter-Furniture/home'

import mallIndex from '@/components/orders/orderCenter/orderCenter-Mall/index'
import cancelMall from '@/components/orders/orderCenter/orderCenter-Mall/cancel'
import endMall from '@/components/orders/orderCenter/orderCenter-Mall/end'
import newMall from '@/components/orders/orderCenter/orderCenter-Mall/new'
import sentMall from '@/components/orders/orderCenter/orderCenter-Mall/sent'
import handsMall from '@/components/orders/orderCenter/orderCenter-Mall/hands'
import vip from '@/components/vipManage/index'
import balance from '@/components/vipManage/balance'
import userOrders from '@/components/vipManage/userOrders'
import details from '@/components/vipManage/details'
import financial from '@/components/Financial/index'
import clearing from '@/components/Financial/clearing'
import clearingds from '@/components/Financial/clearingds'
import settings from '@/components/Settings/index'
import basic from '@/components/basic/index'
import basicLaundry from '@/components/basic/laundry'
import basicFurniture from '@/components/basic/furniture'
import basicMall from '@/components/basic/mall'
import basicDesigner from '@/components/basic/designer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: 'home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/orders',
          name: 'orders',
          component: orders,
        },
        {
          path: '/vip',
          name: 'vip',
          component: vip,
        },
        {
          path: '/financial',
          name: 'financial',
          component: financial,
        },
        {
          path: '/settings',
          name: 'settings',
          component: settings,
        },
        {
          path: '/basic',
          name: 'basic',
          component: basic,
        }
      ]
    },
    {
      path: '/clearing',
      name: 'clearing',
      component: clearing,
    },
    {
      path: '/clearingds',
      name: 'clearingds',
      component: clearingds,
    },


    {
      path: '/balance',
      name: 'balance',
      component: balance,
    },
    {
      path: '/userOrders',
      name: 'userOrders',
      component: userOrders,
    },
    {
      path: '/details',
      name: 'details',
      component: details,
    },
    {
      path: '/designerIndex',
      name: 'designerIndex',
      component: designerIndex,
      children: [
        {
          path: '/newDesigner',
          name: 'newDesigner',
          component: newDesigner,
        },
        {
          path: '/cancelDesigner',
          name: 'cancelDesigner',
          component: cancelDesigner,
        },
        {
          path: '/endDesigner',
          name: 'endDesigner',
          component: endDesigner,
        },
        {
          path: '/hangDesigner',
          name: 'hangDesigner',
          component: hangDesigner,
        },
        {
          path: '/returnDesigner',
          name: 'returnDesigner',
          component: returnDesigner,
        },

        {
          path: '/outDesigner',
          name: 'outDesigner',
          component: outDesigner,
        },
        {
          path: '/sentDesigner',
          name: 'sentDesigner',
          component: sentDesigner,
        },
        {
          path: '/inboundDesigner',
          name: 'inboundDesigner',
          component: inboundDesigner,
        },
      ]
    },
    {
      path: '/orderIndex',
      name: 'orderIndex',
      component: orderIndex,
      children: [
        {
          path: '/newLaundry',
          name: 'newLaundry',
          component: newLaundry,
        },
        {
          path: '/cancelLaundry',
          name: 'cancelLaundry',
          component: cancelLaundry,
        },
        {
          path: '/endLaundry',
          name: 'endLaundry',
          component: endLaundry,
        },
        {
          path: '/hangLaundry',
          name: 'hangLaundry',
          component: hangLaundry,
        },
        {
          path: '/returnLaundry',
          name: 'returnLaundry',
          component: returnLaundry,
        },

        {
          path: '/outLaundry',
          name: 'outLaundry',
          component: outLaundry,
        },
        {
          path: '/sentLaundry',
          name: 'sentLaundry',
          component: sentLaundry,
        },
        {
          path: '/inboundLaundry',
          name: 'inboundLaundry',
          component: inboundLaundry,
        },
      ]
    },
    {
      path: '/furnitureIndex',
      name: 'furnitureIndex',
      component: furnitureIndex,
      children: [
        {
          path: '/cancelFurniture',
          name: 'cancelFurniture',
          component: cancelFurniture,
        },
        {
          path: '/endFurniture',
          name: 'endFurniture',
          component: endFurniture,
        },
        {
          path: '/newFurniture',
          name: 'newFurniture',
          component: newFurniture,
        },
        {
          path: '/shipFurniture',
          name: 'shipFurniture',
          component: shipFurniture,
        },
        {
          path: '/homeFurniture',
          name: 'homeFurniture',
          component: homeFurniture,
        },
      ]
    },
    {
      path: '/mallIndex',
      name: 'mallIndex',
      component: mallIndex,
      children: [
        {
          path: '/cancelMall',
          name: 'cancelMall',
          component: cancelMall,
        },
        {
          path: '/endMall',
          name: 'endMall',
          component: endMall,
        },
        {
          path: '/newMall',
          name: 'newMall',
          component: newMall,
        },
        {
          path: '/sentMall',
          name: 'sentMall',
          component: sentMall,
        },
        {
          path: '/handsMall',
          name: 'handsMall',
          component: handsMall,
        },

      ]
    },
    {
      path: '/basicLaundry',
      name: 'basicLaundry',
      component: basicLaundry,
    },
    {
      path: '/basicFurniture',
      name: 'basicFurniture',
      component: basicFurniture,
    },
    {
      path: '/basicMall',
      name: 'basicMall',
      component: basicMall,
    },
    {
      path: '/basicDesigner',
      name: 'basicDesigner',
      component: basicDesigner,
    },
    {
      path: '*',
      name: '404',
      component: a404
    },
  ]
})
