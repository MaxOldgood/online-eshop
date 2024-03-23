import { useAppSelector } from '../../app/hooks'
import { useGetAllProductsQuery } from '../../shared/api/api-slice'
import { Loader } from '../../shared/ui/loader'
import { Filters } from '../../widgets/filters'
import { ProductsList } from '../../widgets/products-list'
import { Sort } from '../../widgets/sort'
import styles from './shop.module.scss'
import { getFilteredProductsList } from './shopSlice'

export function Shop() {
  const { isSuccess, isLoading, isError } = useGetAllProductsQuery()
  const filteredProducts = useAppSelector((state) => getFilteredProductsList(state))

  return (
    <div className={`${styles.shop} container`}>
      <Filters disabled={!isSuccess} />
      <div className={styles.shop__content}>
        <Sort disabled={!isSuccess} />
        {isLoading && <Loader className={styles.shop__loader} />}
        {isError && <p className={styles.shop__not_found}>something went wrong </p>}
        {isSuccess && filteredProducts?.length === 0 && (
          <p className={styles.shop__not_found}>no products matching filters </p>
        )}
        {isSuccess && filteredProducts && <ProductsList products={filteredProducts} />}
      </div>
    </div>
  )
}
