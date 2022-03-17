import React from 'react';
import { Button, Input, Gapped, Modal } from '@skbkontur/react-ui';
import './Toolbar.css';

type FormData = {
    name: string;
    surname: string;
    patronymic: string;
    city: string;
    unknown: string;
};

type FormState = {
    modalOpened: boolean;
    saved: FormData;
    current: FormData;
};

const defaultData = {
    name: '',
    surname: '',
    patronymic: '',
    unknown: '',
    city: 'Jopa'
};

const buttonStyle = {
    position: 'relative',
    margin: '0 auto'
} as const;

export default class Toolbar extends React.Component<unknown, FormState> {
    public state: FormState = {
        modalOpened: false,
        saved: { ...defaultData },
        current: { ...defaultData }
    };

    public render() {
        const { modalOpened } = this.state;
        return (
            <div>
                <h2 className="header2">Информация о пользователе</h2>
                {this.renderForm()}
                {modalOpened && this.renderModal()}
            </div>
        );
    }

    private renderForm() {
        const { name, surname, patronymic, unknown } = this.state.current;
        return (
            <form>
                <Gapped gap={50} vertical>
                    <label>
                        <div className="label">Имя</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={name}
                            onValueChange={this.onChange('name')}
                        />
                    </label>
                    <label>
                        <div className="label">Фамилия</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={surname}
                            onValueChange={this.onChange('surname')}
                        />
                    </label>

                    <label>
                        <div className="label">Отчество</div>
                        <Input
                            placeholder="Введите отчество пользователя"
                            value={patronymic}
                            onValueChange={this.onChange('patronymic')}
                        />
                    </label>
                    <label>
                        <div className="label">Отрочество</div>
                        <Input
                            placeholder="Введите отрочество пользователя"
                            value={unknown}
                            onValueChange={this.onChange('unknown')}
                        />
                    </label>
                    <Button style={buttonStyle} use="primary" size="large" width={'60%'} onClick={this.openModal}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        );
    }

    private renderModal() {
        const { saved, current } = this.state;
        const isNothingChanged = (Object.keys(current) as (keyof FormData)[]).every(key => saved[key] === current[key]);
        return (
            <Modal onClose={this.closeModal}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>{isNothingChanged ? 'ничего' : 'Результаты записаны'}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private openModal = () => {
        this.setState({
            modalOpened: true
        });
    };

    private closeModal = () => {
        this.setState({
            modalOpened: false,
            saved: { ...this.state.current }
        });
    };

    private onChange = (field: keyof FormData) => {
        return (value: string) => {
            this.setState({
                current: {
                    ...this.state.current,
                    [field]: value
                }
            });
        };
    };
}
