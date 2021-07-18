import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';

import { Transaction, useTransactions } from '../../services/hooks/useTransactions';
import { InputForm, Button, TransactionTypeButton } from '../../components/Form'
import { Select } from '../../components/Form/Select';
import Header from '../../components/Header';
import { SelectCategory } from '../SelectCategory'

import {
  Container,
  FormContainer,
  Fields,
  TransactionsTypes,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .required('O valor é obrigatório')
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
})

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category',
  })
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const navigation = useNavigation()

  const { save } = useTransactions()

  async function handleSelectedTransactionType(type: 'up' | 'down') {
    setTransactionType(type)
  }

  async function handleCloseCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleOpenCategoryModal() {
    setCategoryModalOpen(true)
  }

  async function handleRegister(form: Transaction) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione um categoria')
    }

    const data = {
      id: String(uuid.v4()),
      type: transactionType,
      name: form.name,
      amount: form.amount,
      category: category.key,
      date: new Date().toISOString(),
    } as Transaction

    await save(data);

    setTransactionType('')
    setCategory({
      key: 'category',
      name: 'Category',
    })
    reset()

    navigation.navigate('Listagem')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{
          flex: 1
        }}
        behavior="padding"
      >
        <Container>
          <Header title="Cadastro" />

          <FormContainer>
            <Fields>
              <InputForm
                name="name"
                control={control}
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />
              <InputForm
                name="amount"
                control={control}
                placeholder="Preço"
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
              />

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

            <Button
              title="Enviar"
              onPress={handleSubmit(handleRegister)}
            />
          </FormContainer>

          <Modal visible={categoryModalOpen}>
            <SelectCategory
              category={category}
              setCategory={setCategory}
              close={handleCloseCategoryModal}
            />
          </Modal>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
