import { Loader, ServiceCard } from '@/components/atoms'
import { ServiceProp } from '@/components/atoms/service-card'
import DashboardTemplate from '@/components/templates/dashboard-template'
import useDashboard from '@/hooks/useDashboard'
import { BannerItem } from '@/types/information'

export default function Dashboard() {
  const { services, banners, serviceLoading, bannerLoading } = useDashboard()

  return (
    <DashboardTemplate>
      {serviceLoading ? (
        <Loader />
      ) : (
        <div className="custom-container services flex flex-wrap gap-6 md:justify-between">
          {services &&
            services.length > 0 &&
            services.map((service: ServiceProp) => {
              return (
                <ServiceCard
                  key={service.service_code}
                  service_code={service.service_code}
                  service_icon={service.service_icon}
                  service_name={service.service_name}
                  service_tariff={service.service_tariff}
                />
              )
            })}
        </div>
      )}

      <div className="banners space-y-2">
        <div className=" pl-[2%]">
          <p className="font-bold">Temukan promo menarik</p>
        </div>
        {bannerLoading ? (
          <Loader />
        ) : (
          <div className=" overflow-x-scroll whitespace-nowrap pl-[2%]">
            {banners &&
              banners.map((banner: BannerItem) => {
                return (
                  <div key={banner.banner_name} className="mr-3 inline-block">
                    <img
                      className="w-full"
                      src={banner.banner_image}
                      alt={banner.banner_name}
                    />
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </DashboardTemplate>
  )
}
