import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-native';

import { Input, Button, TransactionTypeButton } from '../../components/Form'
import { Select } from '../../components/Form/Select';
import { SelectCategory } from '../SelectCategory'

import {
  Container,
  Header,
  Title,
  FormContainer,
  Fields,
  TransactionsTypes,
} from './styles';

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  })
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  async function handleSelectedTransactionType(type: 'up' | 'down') {
    setTransactionType(type)
  }

  async function handleCloseCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleOpenCategoryModal() {
    setCategoryModalOpen(true)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <FormContainer>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" keyboardType="numeric" />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Icome"
              onPress={() => handleSelectedTransactionType('up')}
              selected={transactionType}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleSelectedTransactionType('down')}
              selected={transactionType}
            />
          </TransactionsTypes>

          <Select
            title={category.name}
            onPress={handleOpenCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </FormContainer>

      <Modal visible={categoryModalOpen}>
        <SelectCategory
          category={category}
          setCategory={setCategory}
          close={handleCloseCategoryModal}
        />
      </Modal>
    </Container>
  );
};
