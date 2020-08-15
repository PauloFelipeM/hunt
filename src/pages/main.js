import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api';

export default class Main extends Component{
    static navigationOptions = {
        title: 'JSHUNT',
    }

    state = {
        counter: 0,
        docs: [],
        page: 1,
        productInfo: {},
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadMore = () => {
        const { page, productInfo } = this.state;
        if(page == productInfo.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;   

        this.setState({ 
            counter: docs.length, 
            docs: [ ...this.state.docs, ...docs ], 
            productInfo,
            page });
    }

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescrition}>{item.description}</Text>

            <TouchableOpacity 
                style={styles.productButton}
                onPress={() => {this.props.navigation.navigate('Product', { product: item })}}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

    render(){
        return(
            // <View>
            //     <Text>Main Page</Text>
            //     <Text>Docs count: {this.state.counter}</Text>
            //     {this.state.docs.map(products => <Text key={products._id}>{products.title}</Text>)}
            // </View>
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    list: {
        padding: 20,
    },
    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },
    productTitle: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescrition: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    productButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold',
    }

})