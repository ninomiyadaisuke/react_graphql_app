import React from 'react'

import { Card, CardHeader, CardBody, Form, FormGroup, Button } from 'reactstrap'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { DIECTOR_LIST, ADD_MOVIE } from "../queries/queries"
import { useForm } from 'react-hook-form';


const SideNav = () => {
    const { data } = useQuery(DIECTOR_LIST)
    const { register, handleSubmit, errors } = useForm();
    const [addMovie] = useMutation(ADD_MOVIE)
    const onSubmit = ({movieName,movieGenre,directorId}) => {
        addMovie({ variables: { name: movieName, genre: movieGenre, directorId } })
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    映画監督
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="text" name="directorName"
                                placeholder="監督名" />
                        </FormGroup>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="number" name="directorAame"
                                placeholder="年齢" />
                        </FormGroup>
                        <Button color="primary" type="submit">追加</Button>
                    </Form>
                </CardBody>
            </Card>
            <Card className="mt-4">
                <CardHeader>
                    映画作品
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="text" name="movieName"
                                placeholder="タイトル"
                                ref={register}
                            />
                        </FormGroup>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="text" name="movieGenre"
                                placeholder="ジャンル"
                                ref={register}
                            />
                        </FormGroup>
                        <FormGroup>
                            <select
                                className="form-control"
                                type="select"
                                name="directorId"
                                ref={register}
                            >
                                {
                                    data && data.directors.map(({ id, name }) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))
                                }
                                </select>
                        </FormGroup>
                        <Button color="primary" type="submit">追加</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default SideNav
