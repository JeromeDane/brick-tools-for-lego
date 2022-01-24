import React, {useRef, useState} from 'react'
import {ScrollView, ActivityIndicator, View} from 'react-native'
import {RootStackScreenProps} from '../../navigation/types'
import {useGetElementByPartAndColor} from '../../data/elements'
import {useGetSet} from '../../data/sets'
import SetPreview from '../sets/SetPreview'
import Paginator from '../../components/Paginator'

export default function ElementSets({navigation}: RootStackScreenProps<'Element'>) {
  const {routes, index} = navigation.getState(),
        getElementByPartAndColor = useGetElementByPartAndColor(),
        element = getElementByPartAndColor(routes[index].params.partNum, routes[index].params.colorId),
        getSet = useGetSet(),
        [pageSize, setPageSize] = useState(25),
        [currentPage, setCurrentPage] = useState(0),
        scrollRef = useRef()
  return <ScrollView style={{padding: 20}} ref={scrollRef}>
    {element
      ? <View>
        {element.setNumbers.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map(setNumber => {
          const set = getSet(setNumber)
          return set
            ? <SetPreview key={setNumber} set={set} navigation={navigation}/>
            : null
        })}
        {element.setNumbers.length
          ? <Paginator
            pageSize={pageSize}
            numItems={element.setNumbers.length}
            onPageSizeChange={value => setPageSize(parseInt(value.toString()))}
            onPageChange={val => {
              scrollRef.current.scrollTo({y: 0, animated: true})
              setCurrentPage(val)
            }}
            selectedValue={currentPage} />
          : null
        }
      </View>
      : <ActivityIndicator color="#aaa" />
    }
    <View style={{height: 50}} />
  </ScrollView>
}
