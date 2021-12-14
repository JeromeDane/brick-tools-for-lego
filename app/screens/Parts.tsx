import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Image } from 'react-native'
import sortBy from 'sort-by'
import { Paginator, Text, TextInput, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import {partsList} from '../data/parts'
import { getElementByPartAndColor } from '../data/elements'

export default function TabsScreen({ navigation }: RootTabScreenProps<'Themes'>) {
  const [pageSize, setPageSize] = useState(25),
        [currentPage, setCurrentPage] = useState(0),
        [filterBy, setFilterBy] = useState(''),
        scrollRef = useRef(),
        filteredPartNumbers = partsList.filter(part => {
          return (part.colors.length > 0) &&
                 (!filterBy || (part.partNum + part.name).toLowerCase().match(filterBy.toLowerCase()))
        })
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} style={{
        paddingBottom: 100,
        padding: 20,
        flex: 1,
        flexGrow: 1
      }}>
        <View style={{marginBottom: 20}}>
          <TextInput
            label="Search Parts"
            onChangeText={value => {
              setCurrentPage(0)
              setFilterBy(value)
            }} />
        </View>
        {filteredPartNumbers.length
          ? filteredPartNumbers
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((part, i: number) => {
              return <View style={styles.part} key={i}>
                <View>
                  {part.colors.slice(0, 1).map((color, i: number) => {
                    const element = getElementByPartAndColor(part.partNum, color.id)
                    return <View key={i}>
                      <Image
                        style={{marginRight: 10, width: 100, height: 100, backgroundColor: 'gray'}}
                        source={{uri: `https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${element.id}.jpg`}} />
                    </View>
                  })}
                </View>
                <View>
                  <Text>{part.name} #{part.partNum}</Text>
                  <Text>{part.colors.length} color{part.colors.length == 1 ? '' : 's'}</Text>
                </View>
              </View>
            })
          : <Text style={{paddingVertical: 20}}>No parts found matching your criteria.</Text>
        }
        <View style={{paddingTop: 20}}>
          <Paginator
            pageSize={pageSize}
            numItems={filteredPartNumbers.length}
            onPageSizeChange={setPageSize}
            onPageChange={(val : number) => {
              scrollRef.current?.scrollTo({y: 0, animated: true})
              setCurrentPage(val)
            }}
            selectedValue={currentPage} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  part: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'left',
    paddingVertical: 10,
    paddingRight: 20,
    flexGrow: 1
  },
  image: {
    backgroundColor: 'gray',
    marginRight: 10
  },
})
