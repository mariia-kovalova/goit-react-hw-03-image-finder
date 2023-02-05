import { Component } from 'react';
import { SearchIcon } from 'components/SearchIcon';
import { toast } from 'react-toastify';
import {
  Input,
  Label,
  SeachBtn,
  SearchbarStyled,
  SearchForm,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { inputValue: '' };

  handleSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim() === '') {
      toast.error('Enter your query.');
      return;
    }
    this.props.onSubmit(inputValue);
  };

  handleChange = ({ target }) => {
    this.setState({ inputValue: target.value });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleSubmit}>
          <SeachBtn type="submit">
            <Label>Search</Label>
            <SearchIcon />
          </SeachBtn>

          <Input
            className="input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={inputValue}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}
