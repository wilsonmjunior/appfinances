import React from 'react'
import { FlatList } from 'react-native'

import { Button } from '../../components/Form'
import { categories } from '../../data/categories'

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles'

interface Category {
  key: string
  name: string
}

interface Props {
  category: Category
  setCategory: (category: Category) => void
  close: () => void
}

export function SelectCategory({ category, setCategory, close }: Props) {
  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>
          <Category
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        }
        ItemSeparatorComponent={Separator}
      />

      <Footer>
        <Button
          title="Selecionar"
          onPress={close}
        />
      </Footer>
    </Container>
  )
}
